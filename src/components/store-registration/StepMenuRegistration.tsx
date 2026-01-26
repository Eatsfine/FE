import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MenuSchema, type MenuFormValues } from "./Menu.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import MenuItemInput from "./MenuItemInput";

interface StepMenuRegistrationProps {
  defaultValues?: MenuFormValues;
  onChange: (isValid: boolean, data: MenuFormValues) => void;
}

export default function StepMenuRegistration({
  defaultValues,
  onChange,
}: StepMenuRegistrationProps) {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<MenuFormValues>({
    resolver: zodResolver(MenuSchema),
    defaultValues: {
      menus: [{ menuName: "", price: "", description: "" }],
      ...defaultValues,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menus",
  });

  //부모에게 실시간 보고
  const values = watch();

  useEffect(() => {
    onChange(isValid, values as MenuFormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, JSON.stringify(values), onChange]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h3 className="text-gray-900 mb-2">메뉴 등록</h3>
        <p className="text-gray-600 text-sm break-keep">
          대표 메뉴를 등록해주세요. <br className="block sm:hidden" />
          나중에 추가하거나 수정할 수 있습니다.
        </p>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <MenuItemInput
            key={field.id}
            index={index}
            onDelete={() => remove(index)}
            register={register}
            errors={errors}
            setValue={setValue}
          />
        ))}
        <button
          onClick={() => append({ menuName: "", price: "", description: "" })}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="size-5" aria-hidden="true" />
          메뉴 추가
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm text-center sm:text-start break-keep">
          💡 메뉴 등록은 선택사항입니다. 관리자 페이지에서 언제든지 추가하거나
          수정할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
