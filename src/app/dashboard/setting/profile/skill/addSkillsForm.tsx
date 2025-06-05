import ModalWrapper from '@/components/shared/modal/wrapper';
import React from 'react';
import useBaseState from '@/store/baseState';
import SkillItemForm from '@/components/shared/forms/skillItemForm';

const AddSkillsForm = () => {
  const { isOpenSkillProfileModal, setOpneSkillProfileModal } = useBaseState();

  return (
    <ModalWrapper
      isOpen={isOpenSkillProfileModal}
      isOpenHandler={(open) => setOpneSkillProfileModal(open)}
    >
      <SkillItemForm />
    </ModalWrapper>
  );
};

export default AddSkillsForm;
