import { useForm } from "react-hook-form";
import { useNotes } from "../store/useNotes";
import { useParams, useNavigate } from "react-router-dom";
import React from 'react';

export default function EditNote() {
  const { id } = useParams();
  const { items, update } = useNotes();
  const note = items.find((n) => n.id === id);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: note || { title: "", content: "" },
  });

  if (!note) return <p className="text-red-500">Note not found</p>;

  const onSubmit = (data) => {
    update(id, data);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[#E7F2EF] border rounded p-6 space-y-4">
      <h2 className="text-xl font-semibold">Edit Note</h2>
      <input {...register("title", { required: "Title is required" })}
        className="w-full border px-3 py-2 rounded" />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <textarea {...register("content", { required: "Content is required" })}
        className="w-full border px-3 py-2 rounded" rows={6} />
      {errors.content && <p className="text-red-500">{errors.content.message}</p>}

      <button type="submit" className="px-4 py-2 bg-black text-white rounded">Update</button>
    </form>
  );
}
