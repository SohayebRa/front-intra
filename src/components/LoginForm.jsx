// LoginForm Component

const LoginForm = () => {
  return (
    <div className="w-1/4">
      <form className="w-full flex flex-col item-center gap-4">
        <div className="group flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="ex: owen.lopez@example.com"
            className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
          />
        </div>
        <div className="group flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            className="w-full border border-gray-400 py-3 px-4 rounded-md placeholder:font-medium"
          />
        </div>
        <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md py-4">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
