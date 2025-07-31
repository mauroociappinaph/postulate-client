import React from 'react';
import NewPostulationFormContainer from '../components/NewPostulationForm.container';
import { useNewPostulation } from '../hooks/useNewPostulation';
import { useLanguageStore } from '../../../store';

const NuevaPostulacionPage: React.FC = () => {
  const { translate } = useLanguageStore();
  const { loading, formError, success, handleSubmit } = useNewPostulation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl">
        <NewPostulationFormContainer
          onSubmit={handleSubmit}
          loading={loading}
          error={formError}
        />
        {success && (
          <div className="mt-4 text-green-600 text-center font-semibold">
            {translate('successMessage') || 'Application created successfully!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default NuevaPostulacionPage;
