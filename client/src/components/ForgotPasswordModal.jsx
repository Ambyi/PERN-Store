import {
  Backdrop,
  Button,
  HelperText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@windmill/react-ui";
import React, { useState } from "react";
import toast from "react-hot-toast";
import authService from "services/auth.service";
import Spinner from "./Spinner";

const ForgotPasswordModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isSending, setIsSending] = useState(false);

  const toggleModal = () => {
    setMsg("");
    setEmail("");
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    setMsg("");
    setIsSending(true);
    authService
      .forgotPassword(email)
      .then((data) => {
        if (data.data.status === "OK") {
          setIsSending(false);
          toast.success("Email has been sent successfully.");
          setIsOpen(false);
        }
      })
      .catch((error) => {
        setIsSending(false);
        setMsg(error.response.data);
      });
  };
  return (
    <div>
      <>
        {isOpen && <Backdrop />}
        <span
          onClick={() => setIsOpen(!isOpen)}
          className="mb-1 text-sm text-purple-700 cursor-pointer"
        >
          Forgot password?
        </span>
        <Modal isOpen={isOpen} onClose={toggleModal}>
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalBody>
            <Label>
              <span className="font-semibold">Email</span>
              <Input
                className="mt-1 border py-2 pl-2"
                valid
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                inputMode="email"
              />
            </Label>
            {msg && <HelperText valid={false}>{msg}</HelperText>}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSubmit}
              disabled={email.trim().length < 1}
              className="w-full sm:w-auto"
            >
              {isSending ? <Spinner size={20} /> : "Send Email"}
            </Button>
          </ModalFooter>
        </Modal>
      </>
    </div>
  );
};

export default ForgotPasswordModal;