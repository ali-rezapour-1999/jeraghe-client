import React from 'react'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import useBreakpoint from '@/hooks/useBreakPoint';
import useBaseState from '@/store/baseState';
import SkillItemForm from '../forms/skillItemForm';

const SkillFormModal = () => {
  const { isMobile } = useBreakpoint();
  const { isOpenSkillProfileModal, setOpneSkillProfileModal } = useBaseState();

  if (isMobile) {
    return (
      <Drawer open={isOpenSkillProfileModal} onOpenChange={() => setOpneSkillProfileModal(false)}>
        <DrawerContent className="px-4 pb-6 dark:bg-primary-dark bg-primary-light w-full">
          <DrawerTitle />
          <SkillItemForm />
        </DrawerContent>
      </Drawer >
    );
  }

  return (
    <Dialog open={isOpenSkillProfileModal} onOpenChange={() => setOpneSkillProfileModal(false)}>
      <DialogContent className="sm:max-w-xl dark:bg-primary-dark bg-primary-light w-full border-none">
        <DialogTitle />
        <SkillItemForm />
      </DialogContent>
    </Dialog>
  );
};

export default SkillFormModal 
