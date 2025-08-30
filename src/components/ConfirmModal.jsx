export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Silmek istediğinize emin misiniz?",
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        <p className="text-sm text-slate-600 mb-5">Bu işlem geri alınamaz.</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-slate-200 rounded-md hover:bg-slate-300"
          >
            Hayır
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-500"
          >
            Evet, Sil
          </button>
        </div>
      </div>
    </div>
  );
}
