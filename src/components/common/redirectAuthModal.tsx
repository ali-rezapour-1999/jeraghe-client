import useBaseState from "@/state/baseState";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";

const RedirectAuthModal = () => {
  const { isOpenAuthRequireModal, setOpenAuthRequireModel } = useBaseState();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = () => {
    setOpenAuthRequireModel(false);
    localStorage.setItem("returnUrl", pathname);
    router.push("/login");
  };

  const hadlerBacktoHome = () => {
    setOpenAuthRequireModel(false);
    router.push("/");
  };

  return (
    <Modal
      backdrop="opaque"
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
      isOpen={isOpenAuthRequireModal}
      onOpenChange={hadlerBacktoHome}
    >
      <ModalContent className="dark:bg-light">
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p className="text-primary bg-text-light">احراز هویت لازم است</p>
            </ModalHeader>
            <ModalBody>
              <p className="text-primary bg-text-light">
                برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.
              </p>
            </ModalBody>
            <ModalFooter className="w-full flex justify-center items-center">
              <Button color="danger" variant="light" onPress={hadlerBacktoHome}>
                صرف نظر
              </Button>
              <Button color="primary" onPress={handleLogin}>
                ورود به حساب
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RedirectAuthModal;
