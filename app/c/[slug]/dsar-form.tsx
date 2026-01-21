export default function DsarsForm({
  companyId,
  disabled,
}: {
  companyId: string
  disabled: boolean
}) {
  return (
    <form className="space-y-4">
      <input disabled={disabled} className="input" placeholder="Full Name" />
      <input disabled={disabled} className="input" placeholder="Email" />
      <input disabled={disabled} className="input" placeholder="Phone" />
      <textarea disabled={disabled} className="input" placeholder="Request details" />

      <button
        disabled={disabled}
        className={`w-full py-2 rounded text-white ${
          disabled ? "bg-gray-400 cursor-not-allowed" : "bg-black"
        }`}
      >
        Submit DSAR
      </button>
    </form>
  )
}
