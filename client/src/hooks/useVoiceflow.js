import { useEffect } from 'react';

export const useVoiceflow = () => {
  useEffect(() => {
    // Verificar si ya existe el script para evitar duplicados
    if (document.querySelector('script[src="https://cdn.voiceflow.com/widget-next/bundle.mjs"]')) {
      return;
    }

    // Implementación basada en el script original de Voiceflow
    (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '6889176328d89b3c3ef22b60' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          }
        });
      }
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; 
      v.type = "text/javascript"; 
      s.parentNode.insertBefore(v, s);
    })(document, 'script');

    // Cleanup: remover el script cuando el componente se desmonte
    return () => {
      const existingScript = document.querySelector('script[src="https://cdn.voiceflow.com/widget-next/bundle.mjs"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);
};
