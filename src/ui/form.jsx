import { useSelector } from "react-redux";
import { TextArea, Input, Loader } from "./index";

const Form = (props) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    FormSubmit,
  } = props;
  const { isLoading } = useSelector((state) => state.article);
  return (
    <form
      className="d-flex flex-column gap-2 w-50 mx-auto"
      onSubmit={FormSubmit}
    >
      <Input label={"Title"} value={title} setValue={setTitle} />
      <TextArea
        label={"description"}
        value={description}
        setValue={setDescription}
      />
      <TextArea label={"body"} value={body} setValue={setBody} height="300px" />
      <button className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "loading..." : "Submit"}
      </button>
      {isLoading && <Loader />}
    </form>
  );
};

export default Form;

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, fuga.
// Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti dignissimos at aliquid id possimus, earum sunt obcaecati dolore impedit magnam!
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad vero qui distinctio quam provident. Vitae recusandae eveniet sequi sed. Recusandae, explicabo sequi? Aperiam, modi. Ad consequatur suscipit illo! Rem, ducimus?
