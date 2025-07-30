import { useEffect } from 'react';

export const useVoiceflow = () => {
  useEffect(() => {
    // Verificar si ya existe el script para evitar duplicados
    if (document.querySelector('script[src="https://cdn.voiceflow.com/widget-next/bundle.mjs"]')) {
      // Si ya existe, intentar inicializar directamente
      if (window.voiceflow && window.voiceflow.chat) {
        try {
          window.voiceflow.chat.load({
            verify: { projectID: '6889176328d89b3c3ef22b60' },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production'
          });
        } catch (error) {
          console.error('Error inicializando Voiceflow:', error);
        }
      }
      return;
    }

    // Función para cargar e inicializar Voiceflow
    const loadVoiceflow = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
      script.async = true;
      
      script.onload = () => {
        console.log('Script de Voiceflow cargado');
        // Intentar cargar el widget con varios reintentos
        let attempts = 0;
        const maxAttempts = 10;
        
        const tryLoad = () => {
          attempts++;
          if (window.voiceflow && window.voiceflow.chat) {
            try {
              window.voiceflow.chat.load({
                verify: { projectID: '6889176328d89b3c3ef22b60' },
                url: 'https://general-runtime.voiceflow.com',
                versionID: 'production'
              });
              console.log('Voiceflow widget cargado exitosamente');
            } catch (error) {
              console.error('Error cargando Voiceflow widget:', error);
            }
          } else if (attempts < maxAttempts) {
            console.log(`Intento ${attempts}/${maxAttempts} - Voiceflow no está listo, reintentando...`);
            setTimeout(tryLoad, 200);
          } else {
            console.error('No se pudo cargar Voiceflow después de', maxAttempts, 'intentos');
          }
        };
        
        tryLoad();
      };
      
      script.onerror = (error) => {
        console.error('Error cargando el script de Voiceflow:', error);
      };
      
      // Insertar el script en el head del documento
      document.head.appendChild(script);
    };

    // Cargar Voiceflow cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadVoiceflow);
    } else {
      loadVoiceflow();
    }

    // Cleanup: remover el script cuando el componente se desmonte
    return () => {
      const existingScript = document.querySelector('script[src="https://cdn.voiceflow.com/widget-next/bundle.mjs"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
      
      // Limpiar el widget de Voiceflow
      if (window.voiceflow && window.voiceflow.chat && window.voiceflow.chat.destroy) {
        try {
          window.voiceflow.chat.destroy();
        } catch (error) {
          console.error('Error destruyendo Voiceflow widget:', error);
        }
      }
    };
  }, []);
};