import { getServiceById, updateService } from "@/services/serviceService";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";

const schema = z.object({
  title: z.string().min(3, "Title required"),
  category: z.string().min(2, "Category required"),
  description: z.string().min(10, "Description required"),
  price: z.coerce.number().min(1),
  capacity: z.coerce.number().min(1),
});

const EditService = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    try {
      const response = await getServiceById(id);
      const service = response.service;

      reset({
        title: service.title,
        category: service.category,
        description: service.description,
        price: service.price,
        capacity: service.capacity,
      });

      setPreview(service.image_url);
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // const handleImage = (e) => {
  //   const file = e.target.files[0];
  //   setImage(file);
  //   setPreview(URL.createObjectURL(file));
  // };
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("capacity", data.capacity);

      // Only append a new image if the user selected one.
      // Otherwise, the backend should keep the existing image.
      if (image) {
        formData.append("image", image);
      }

      await updateService(id, formData);

      toast.success("Service Updated");
      navigate("/vendor/services");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold">Add Service</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-white p-8 rounded-xl shadow"
      >
        <input
          placeholder="Service Title"
          {...register("title")}
          className="w-full border p-3 rounded"
        />

        <p className="text-red-500">{errors.title?.message}</p>

        <input
          placeholder="Category"
          {...register("category")}
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Description"
          {...register("description")}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          {...register("price")}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Capacity"
          {...register("capacity")}
          className="w-full border p-3 rounded"
        />

        {/* <input type="file" accept="image/*" onChange={handleImage} /> */}
        {/* {preview && <img src={preview} className="h-48 rounded object-cover" />} */}

        <div className="space-y-3">
          {preview && (
            <img
              src={preview}
              alt="Service"
              className="h-48 w-48 rounded object-cover"
            />
          )}

          <label className="inline-block cursor-pointer rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">
            Change Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        <button
          disabled={isSubmitting}
          className="rounded bg-indigo-600 px-6 py-3 text-white"
        >
          {isSubmitting ? "Updating..." : "Update Service"}
        </button>
      </form>
    </div>
  );;
};

export default EditService;
