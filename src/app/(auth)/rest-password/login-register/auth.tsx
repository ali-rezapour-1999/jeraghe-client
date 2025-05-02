"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/shared/forms/loginForm";
import RegisterForm from "@/components/shared/forms/registerForm";
import useBreakpoint from "@/hooks/useBreakPoint";
import useBaseState from "@/store/baseState";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authState";
import SocialMediaLogin from "@/components/shared/modal/socialMediaLoginModal";

const AuthButtons = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { isOpenAuthRequireModal, setOpenAuthRequireModel } = useBaseState();
  const { isMobile } = useBreakpoint();
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isAuthNeedSection, setAuthText] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const privatePaths = ["/dashboard", "/post/create", "/ideas/create"];
    if (isAuthenticated) {
      setOpenAuthRequireModel(false);
    }
    const isPrivatePath = privatePaths.some((path) =>
      pathname.startsWith(path)
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

  const authTabs = (
    <Tabs
      defaultValue="login"
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 gap-1 border-b-2">
        <TabsTrigger
          value="login"
          className={
            activeTab == "login"
              ? "bg-primary/30"
              : ""
          }
        >
          ورود
        </TabsTrigger>
        <TabsTrigger
          className={
            activeTab == "register"
              ? "bg-primary/30"
              : ""
          }
          value="register"
        >
          ثبت نام
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="mt-4">
        <LoginForm onSuccess={() => setOpenAuthRequireModel(false)} />
      </TabsContent>
      <TabsContent value="register" className="mt-4">
        <RegisterForm onSuccess={() => setOpenAuthRequireModel(false)} />
      </TabsContent>
    </Tabs>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpenAuthRequireModal} onOpenChange={hadlerBacktoHome}>
        <DrawerContent className="px-4 pb-6 dark:bg-primary-dark bg-primary-light w-full">
          <DrawerTitle />
          <div className="mx-auto flex flex-col gap-5 w-full">{authTabs}
            <SocialMediaLogin />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpenAuthRequireModal} onOpenChange={hadlerBacktoHome}>
      <DialogContent className="sm:max-w-xl dark:bg-primary-dark bg-primary-light w-full">
        <DialogTitle />
        {authTabs}
        <SocialMediaLogin />
      </DialogContent>
    </Dialog>
  );
};
export default AuthButtons;
