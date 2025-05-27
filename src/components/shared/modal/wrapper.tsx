import React from 'react'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import useBreakpoint from '@/hooks/useBreakPoint';

const ModalWrapper = ({ children, isOpen, isOpenHandler }: { children: React.ReactNode, isOpen: boolean, isOpenHandler: (open: boolean) => void }) => {
  const { isMobile } = useBreakpoint();
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={isOpenHandler}>
        <DrawerContent className="px-4 pb-6 dark:bg-primary-dark bg-primary-light w-full">
          <DrawerTitle />
          {children}
        </DrawerContent>
      </Drawer >
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={isOpenHandler}>
      <DialogContent className="sm:max-w-xl dark:bg-primary-dark bg-primary-light w-full border-none">
        <DialogTitle />
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default ModalWrapper
