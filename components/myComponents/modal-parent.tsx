"use client"
import Modal from "./modal";
import { RecoilRoot } from "recoil";

function ModalParent() {
  return (
    <RecoilRoot>
      <Modal />
    </RecoilRoot>
  )

}

export default ModalParent;
