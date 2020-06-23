import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

export let translations = new LocalizedStrings({
  en: {
    anonimo: 'Enter as anonymous',
    btn_entrar: 'Login',
    btn_submeter_nota: 'Submit',
    delete: 'Delete',
    update: 'Update',
  },
  pt: {
    anonimo: 'Entrar como anónimo',
    btn_entrar: 'Entrar',
    btn_submeter_nota: 'Submeter',
    delete: 'apagar',
    update: 'atualizar',
  }
});
