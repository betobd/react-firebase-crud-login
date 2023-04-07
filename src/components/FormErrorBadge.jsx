const FormErrorBadge = ({ error }) => {
  return (
    <>
      {error && (
        <p className="my-2 text-sm text-red-600 dark:text-green-500">
          <span className="font-medium">😂</span> {error.message}
        </p>
      )}
    </>
  );
};
export default FormErrorBadge;
