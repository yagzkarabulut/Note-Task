import { useForm } from "react-hook-form";
import { useNotes } from "../store/useNotes";
import { useNavigate } from "react-router-dom";
import React from 'react';

export default function NewNote() {
  const { add } = useNotes();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    add(data);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[#E7F2EF] border rounded p-6 space-y-4">
      <h2 className="text-xl font-semibold">Add Note</h2>
      <input  {...register("title", { required: "Title is required" })}
        placeholder="Title" className="w-full border px-3 py-2 rounded" />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <textarea {...register("content", { required: "Content is required" })}
        placeholder="Content" className="w-full border px-3 py-2 rounded" rows={6} />
      {errors.content && <p className="text-red-500">{errors.content.message}</p>}

      <button type="submit" className="px-4 py-2 bg-black text-white rounded">Save</button>
    </form>
  );
}
