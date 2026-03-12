"use client";

type ProfileActionsProps = {
  isEditing: boolean;
  submitLoading: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onLogout: () => void;
  onBack: () => void;
};

export const ProfileActions = ({
  isEditing,
  submitLoading,
  onEdit,
  onSave,
  onCancel,
  onLogout,
  onBack,
}: ProfileActionsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      {!isEditing ? (
        <button
          type="button"
          onClick={onEdit}
          className="rounded-xl bg-red-500 px-5 py-3 text-white"
        >
          Өөрчлөх
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={onSave}
            disabled={submitLoading}
            className="rounded-xl bg-red-500 px-5 py-3 text-white disabled:opacity-50"
          >
            {submitLoading ? "Хадгалж байна..." : "Хадгалах"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl bg-white px-5 py-3 text-black"
          >
            Болих
          </button>
        </>
      )}

      <button
        type="button"
        onClick={onBack}
        className="rounded-xl bg-white px-5 py-3 text-black"
      >
        Буцах
      </button>

      <button
        type="button"
        onClick={onLogout}
        className="rounded-xl bg-white px-5 py-3 text-black"
      >
        Logout
      </button>
    </div>
  );
};
