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

const errorInGeneration = atom({
  key: "errorInGeneration",
  default: "",
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

export { messagesState, codeMessagesState, addContenttoMessageState };
