const form = document.querySelector("[data-form-container]");
const inputs = document.querySelectorAll(".list-input input");
const verify = document.querySelector("[data-verify-btn]");

const handleInput = (e) => {
  const input = e?.target;
  e.preventDefault();

  if (input?.nextElementSibling && input?.value)
    input.nextElementSibling.focus();
};

const handlePaste = (event, inputIndex) => {
  const paste = event?.clipboardData.getData("text");
  event.preventDefault();
  inputs.forEach((input, i) => {
    const currentIndex = i - inputIndex < 0 ? undefined : i - inputIndex;
    pasteAndFocusOnNext(input, currentIndex, paste);
  });

  submitWhenAllFieldInserted(paste, inputs);
};

const submitWhenAllFieldInserted = (paste, list) => {
  if (paste?.length === list?.length) {
    verify.focus();
    verify.textContent = "Verifying ...";
    return console.log("submited with succes !!");
  }
  return console.log("oups try again");
};

const createInputsEvent = (list) =>
  list.forEach((input, index) =>
    input.addEventListener("paste", (e) => handlePaste(e, index), {
      once: true,
    })
  );
const pasteAndFocusOnNext = (input, index, paste) => {
  input.value = paste[index] ?? "";
  input.classList.toggle("active", !!input.value);
  if (input?.nextElementSibling && input.value) {
    input.nextElementSibling.focus();
  }
};

createInputsEvent(inputs);
form.addEventListener("input", handleInput);
