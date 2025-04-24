
import { useState } from "react";
import { Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingCallButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      <a
        href="tel:+78001234567"
        className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2"
      >
        <Phone className="h-5 w-5" />
        <span className="hidden sm:inline">Позвонить сейчас</span>
      </a>
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full shadow-lg"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FloatingCallButton;
