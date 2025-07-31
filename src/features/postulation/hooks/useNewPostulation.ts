
import { useState } from 'react';
import { usePostulationsStore, useLanguageStore, useAuthStore } from '../../../store';
import { NewPostulationFormValues } from '@/features/postulation/types/NewPostulationForm.interface';
import { postulationsApi } from '../api/postulations';

export const useNewPostulation = () => {
  const { translate } = useLanguageStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);
  const addPostulation = usePostulationsStore(state => state.addPostulation);

  const handleSubmit = async (values: NewPostulationFormValues) => {
    if (!user?.id) {
      setFormError(translate('errorMessage') || 'No se encontró el ID del usuario.');
      return;
    }

    setLoading(true);
    setFormError(undefined);
    setSuccess(false);

    try {
      const {
        company,
        position,
        status,
        applicationDate,
        link,
        description,
        recruiterContact,
        sentCV,
        sentEmail,
      } = values;

      await postulationsApi.create({
        company,
        position,
        status,
        applicationDate,
        link,
        description,
        sendCv: sentCV,
        sendEmail: sentEmail,
        userId: user.id,
      });

      const newPostulation = {
        company,
        position,
        status,
        applicationDate,
        link,
        description,
        recruiterContact,
        sentCV,
        sentEmail,
        userId: user.id,
      };

      addPostulation(newPostulation);

      setSuccess(true);
    } catch {
      setFormError(translate('errorMessage') || 'An error occurred while saving the application.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formError,
    success,
    handleSubmit,
  };
};
