import { useEffect, useRef, useState } from "react";
import InputField from "./InputField";
import service from "../service/service";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setMenuForm } from "@/store/slices/formSlices";
import { setActiveMenu, setListMenu } from "@/store/slices/menuSlices";
import { Toaster, toast } from "sonner";
import Modal from "./Modal";

interface Props {
  afterSubmit: Function;
}
const FormComponent = (props: Props) => {
  const dispatch = useAppDispatch();
  const idRef = useRef<any>(null);
  const depthRef = useRef<any>(null);
  const parentRef = useRef<any>(null);
  const nameRef = useRef<any>(null);
  const dataForm = useAppSelector((state) => state.form.value);
  const activeMenu = useAppSelector((state) => state.menu.activeMenu);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const resetForm = () => {
    if (dataForm) {
      if (dataForm?.id) {
        idRef.current.value = dataForm.id;
      }
      depthRef.current.value = dataForm?.depth;
      parentRef.current.value = dataForm?.parent ? dataForm.parent.name! : "";
      nameRef.current.value = dataForm?.name;
    } else {
      idRef.current.value = "";
      depthRef.current.value = 0;
      parentRef.current.value = "";
      nameRef.current.value = "";
    }
  };
  const _submitForm = async (e: any) => {
    e.preventDefault();
    if (loading) return;
    if (!nameRef.current.value) {
      toast("Name is required!", {
        style: { backgroundColor: "darkred", color: "white" },
      });
      return;
    }
    var params = {
      name: nameRef.current.value,
      depth: parseInt(depthRef.current.value),
    };
    if (dataForm?.parentId) {
      params = { ...params, ...{ parentId: dataForm.parentId } };
    }
    let res = null;
    let isNew = true;
    setLoading(true);
    if (dataForm?.id) {
      isNew = false;
      res = await service.updateMenu(dataForm.id, params);
    } else {
      res = await service.createMenu(params);
    }
    setLoading(false);
    if (res?.success) {
      dispatch(setMenuForm(res.data as MenuForm));
      resetForm();
      if (isNew && !res.data.parentId) {
        dispatch(setActiveMenu(res.data));
      }
      props.afterSubmit(res.data);
      toast("Data is saved!", {
        style: { backgroundColor: "green", color: "white" },
      });
      return;
    }
    toast("Something went wrong! Unable to save data.", {
      style: { backgroundColor: "darkred", color: "white" },
    });
  };
  const _delete = async () => {
    setOpenModal(false);
    if (loading) return;
    setLoading(true);
    const res = await service.removeMenu(dataForm?.id!);
    if (!res.success) {
      setLoading(false);
      toast("Something went wrong! Unable to delete data.", {
        style: { backgroundColor: "darkred", color: "white" },
      });
      return;
    }

    const json = await service.getParents();
    const data = json.map((it: any) => it as Menu);
    dispatch(setListMenu(data));
    setLoading(false);

    if (!dataForm?.parentId) {
      dispatch(setActiveMenu(null));
      dispatch(setMenuForm(null));
    } else {
      const findActiveMenu = (one: Menu) => {
        let item = data.find((it: Menu) => it.id == one.id);
        const findSubMenus = (menus: Menu[]) => {
          for (let i = 0; i < menus.length; i++) {
            findActiveMenu(menus[i]);
          }
        };
        if (!item) {
          return findSubMenus(one.subMenus);
        }
        dispatch(setActiveMenu(item!));
      };
      findActiveMenu(activeMenu!);
    }
    toast("Successfully deleted.", {
      style: { backgroundColor: "green", color: "white" },
    });
  };
  useEffect(() => {
    setOpenModal(false);
    resetForm();
  }, [dataForm]);
  return (
    <form
      autoComplete="off"
      className="flex flex-col gap-4"
      onSubmit={(ev) => _submitForm(ev)}
    >
      <InputField
        type="text"
        ref={idRef}
        label="Menu ID"
        disabled={true}
        fullwidth={true}
        defaultValue={dataForm?.id || ""}
        onchange={undefined}
      />
      <InputField
        type="text"
        ref={depthRef}
        label="Depth"
        fullwidth={true}
        disabled={true}
        defaultValue={dataForm?.depth ? dataForm.depth : 0}
        onchange={undefined}
      />
      <InputField
        type="text"
        ref={parentRef}
        label="Parent Data"
        fullwidth={true}
        disabled={true}
        defaultValue={
          dataForm?.parent && dataForm.parent.name != undefined
            ? (dataForm.parent.name as string)
            : ""
        }
        onchange={undefined}
      />
      <InputField
        type="text"
        ref={nameRef}
        label="Name"
        fullwidth={true}
        disabled={false}
        defaultValue={dataForm?.name ? dataForm.name : ""}
        onchange={undefined}
      />
      <div className="w-full flex gap-4 flex-col-reverse md:gap-8 md:flex-row md:items-center md:justify-between">
        {dataForm?.id && (
          <button
            onClick={() => setOpenModal(true)}
            type="button"
            className="rounded-3xl px-8 py-3 text-red-600 bg-white border border-red-600 md:w-2/3 text-sm font-bold opacity-90 hover:opacity-100"
          >
            Delete
          </button>
        )}
        <button
          type="submit"
          className="rounded-3xl border border-transparent px-8 py-3 bg-blue-600 text-white md:w-2/3 text-sm font-bold opacity-90 hover:opacity-100"
        >
          {dataForm?.id ? "Update" : "Save"}
        </button>
      </div>
      <Toaster position="top-center" theme="light" richColors />
      <Modal
        title="Confirmation"
        message="Are you sure want to delete?"
        actionTitle="Delete"
        open={openModal}
        onClose={() => setOpenModal(false)}
        action={() => _delete()}
      />
    </form>
  );
};
export default FormComponent;
