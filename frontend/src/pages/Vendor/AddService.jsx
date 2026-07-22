import { useState } from "react";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { createService } from "../../services/serviceService";

import { uploadImage } from "../../services/uploadService";

const schema = z.object({
  title: z.string().min(3, "Title required"),
  category: z.string().min(2, "Category required"),
  description: z.string().min(10, "Description required"),
  price: z.coerce.number().min(1),
  capacity: z.coerce.number().min(1),
});

const AddService = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
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

      if (image) {
        formData.append("image", image);
      }

      await createService(formData);

      toast.success("Service Created Successfully");
      navigate("/vendor/services");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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

        <input type="file" accept="image/*" onChange={handleImage} />

        {preview && <img src={preview} className="h-48 rounded object-cover" />}

        <button
          disabled={uploading || isSubmitting}
          className="rounded bg-indigo-600 px-6 py-3 text-white"
        >
          {uploading ? "Uploading Image..." : "Create Service"}
        </button>
      </form>
    </div>
  );
};

export default AddService;
