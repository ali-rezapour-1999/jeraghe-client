import useBaseState from "@/state/baseState";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/state/authState";
import React, { useEffect, useState } from "react";
import Register from "./register";
import Login from "./login";
import SocialMediaLogin from "./socialMediaLogin";
import { TiWarning } from "react-icons/ti";
import Btn from "../../ui/btn";

const AuthenticatedModal = () => {
  const { isOpenAuthRequireModal, setOpenAuthRequireModel } = useBaseState();
  const router = useRouter();
  const [isLogin, setChangeLogin] = useState<boolean>(true);
  const { isAuthenticated } = useAuthStore();
  const [isAuthNeedSection, setAuthText] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const privatePaths = ["/dashboard", "/post/create", "/ideas/create"];
    if (isAuthenticated) {
      setOpenAuthRequireModel(false);
    }
    const isPrivatePath = privatePaths.some((path) =>
      pathname.startsWith(path),
    );
    if (isPrivatePath) setAuthText(true);
  }, [isAuthenticated, pathname, setOpenAuthRequireModel]);

  const hadlerBacktoHome = () => {
    if (isAuthNeedSection) {
      router.push("/");
      setOpenAuthRequireModel(false);
    } else {
      setOpenAuthRequireModel(false);
    }
  };

  return (
    <Modal
      backdrop="opaque"
      hideCloseButton={true}
      classNames={{
        wrapper: "h-screen top-0 overflow-hidden",
        base: "h-[550px] py-5 md:py-1 overflow-scroll md:overflow-auto md:h-max",
        backdrop:
          "bg-gradient-to-t from-primary-gray to-primary-gray/30 dark:from-light dark:to-light/5 backdrop-opacity-80",
      }}
      size="xl"
      isOpen={isOpenAuthRequireModal}
      onOpenChange={hadlerBacktoHome}
    >
      <ModalContent className="bg-gradient-to-br from-default-300 to-default-60 dark:from-[#00171E] dark:to-[#004551]">
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isAuthNeedSection ? (
                <div className="text-warning-400 flex flex-col md:flex-row items-center justify-center gap-3">
                  <TiWarning size={25} />{" "}
                  <p className="text-sm md:text-[15px] text-center">
                    برای استفاده از این بخش نیاز به احراز هویت داری
                  </p>
                </div>
              ) : null}
              <h1 className="text-3xl font-bold text-center text-primary dark:text-light">
                {isLogin ? "ورود به جرقه" : "ثبت نام در جرقه 🚀"}
              </h1>
            </ModalHeader>
            <ModalBody>
              {isLogin ? (
                <Login changePage={() => setChangeLogin(false)} />
              ) : (
                <Register changePage={() => setChangeLogin(true)} />
              )}
            </ModalBody>
            <ModalFooter className="w-full flex flex-col justify-center items-center">
              <SocialMediaLogin />
              <Btn
                className="w-full bg-transparent border-1"
                onClick={hadlerBacktoHome}
              >
                قصد ندارم فعلا احراز هویت کنم
              </Btn>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AuthenticatedModal;
