import { Loader2 } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#D71C1C] mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Vérification de session...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
