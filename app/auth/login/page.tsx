import LoginForm from "./login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT – INFO */}
          <div>
            <h1 className="text-3xl font-bold">
              DSAR Portal Access
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              This login is intended for <strong>company owners</strong> and
              <strong> administrators</strong> to manage Data Subject Access
              Requests.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-gray-500">
              <li>• Review and respond to DSAR requests</li>
              <li>• Track request status and timelines</li>
              <li>• Maintain GDPR compliance</li>
            </ul>

            <p className="mt-6 text-sm text-gray-400">
              If you are an individual user, please search for a company on
              the home page to submit a DSAR request.
            </p>
          </div>

          {/* RIGHT – FORM */}
          <div className="bg-white border rounded-lg p-8 shadow-sm">
            <LoginForm />
          </div>

        </div>
      </div>
    </main>
  )
}
