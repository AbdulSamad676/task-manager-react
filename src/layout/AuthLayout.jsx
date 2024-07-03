const AuthLayout = ({ children }) => {
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-black'>
      {/* <AuthHeader/> */}
      <main className='w-full h-full flex justify-center items-center'>
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
