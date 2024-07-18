import { atom, selector } from "recoil";

const messagesState = atom({
  key: "messageText",
  default: [{
    prompt: "",
    response: ""
  }],
})

const codeMessagesState = atom({
  key: "codeMessagesState",
  default: [{
    prompt: "",
    response: {
      text: "",
      type: "markdown"
    }
  }]
})

const addContenttoMessageState = selector({
  key: "addContenttoMessageState",
  get: ({ get }) => get(messagesState),
  set: ({ get, set }, entry) => {
    const history = get(messagesState);
    // @ts-ignore
    set(messagesState, [...history, entry]);
  }
})

//for model 
const modalAtom = atom({
  key: "modelAtom",
  default: false,
})

export { messagesState, codeMessagesState, modalAtom };
