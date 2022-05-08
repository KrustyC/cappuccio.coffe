/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { FormPlace, FormPlaceImage, Place } from "@/types/global";
import { isValidAddress, isValidDescription } from "@/utils/validators";
import { LoadingSpinner } from "../../LoadingSpinner";
import { Input } from "../../Input";
import { Editor } from "../../Editor";
import { MultipleImagesInput } from "./MultipleImagesInput";
import { LocationInput } from "./LocationInput";

interface PlaceFormProps {
  className?: string;
  place?: Place;
  pending?: boolean;
  onSavePlace: (place: Place) => void;
}

const DEFAULT_CAPPUCCINO: Partial<Place> = {
  name: "",
  address: undefined,
  images: [],
};

export const PlaceForm: React.FC<React.PropsWithChildren<PlaceFormProps>> = ({
  place = DEFAULT_CAPPUCCINO,
  pending,
  onSavePlace,
}) => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { isDirty, errors, isValid },
  } = useForm<FormPlace>({
    defaultValues: {
      ...place,
      images:
        place.images?.map((image) => ({
          image,
        })) || [],
    },
    mode: "onBlur",
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "images",
  });

  const watchFieldArray = watch("images");

  const onSubmit = (data: FormPlace) => {
    onSavePlace({
      ...data,
      address: {
        address: data.address?.address || "",
        coordinates: {
          lat: data.address?.coordinates?.lat || 0,
          lng: data.address?.coordinates.lng || 0,
        },
      },
      images: data.images.map(({ image }) => image),
    });
  };

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const onChangeImages = (images: FormPlaceImage[]) => {
    replace(images);
  };

  return (
    <form
      className="flex flex-col w-9/12"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <div className="flex  flex-col w-full mb-8">
        <div className="mb-4">
          <Input
            register={register}
            options={{ required: "Please add a name" }}
            error={errors.name}
            label="Name"
            name="name"
            type="text"
            placeholder="Place Name"
          />
        </div>

        <div className="mb-8">
          <span className="uppercase block text-gray-700 text-sm font-bold mb-2">
            Description
          </span>
          <div>
            <Controller
              control={control}
              name="description"
              rules={{ validate: isValidDescription }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Editor
                  value={value}
                  error={errors?.description}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="address"
            rules={{ validate: isValidAddress }}
            render={({ field: { value, onChange, onBlur } }) => (
              <LocationInput
                currentAddress={value}
                onChangeAddress={onChange}
              />
            )}
          />

          {/* <Input
            register={register}
            options={{ required: "Please add a name" }}
            error={errors.name}
            label="Name"
            name="name"
            type="text"
            placeholder="Place Name"
          /> */}
        </div>

        <div className="mb-4">
          <span className="uppercase block text-gray-700 text-sm font-bold mb-2">
            Images
          </span>
          <MultipleImagesInput
            images={controlledFields}
            onChangeImages={onChangeImages}
          />
        </div>
      </div>

      <div className="flex items-center border-t-2 border-slate-300 pt-4 h-24">
        <button
          className="btn-admin btn-primary mr-4"
          type="submit"
          disabled={pending || !isValid || !isDirty}
        >
          {pending ? <LoadingSpinner /> : "Save Place"}
        </button>
      </div>
    </form>
  );
};
