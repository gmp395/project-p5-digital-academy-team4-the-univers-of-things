import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HeaderPublic from '@/components/layout/HeaderPublic.vue';

describe('HeaderPublic.vue', () => {
  const mountOptions = {
  global: {
    stubs: {
      RouterLink: {
        template: '<a><slot /></a>'
      }
    }
  }
};

  it('debe renderizar el título CineMagic', () => {
    const wrapper = mount(HeaderPublic, mountOptions);
    expect(wrapper.text()).toContain('CineMagic');
  });

  it('debe contener el enlace de Home', () => {
    const wrapper = mount(HeaderPublic, mountOptions);
    // Verificamos que el texto "Home" exista dentro del header
    expect(wrapper.text()).toContain('Home');
  });

  it('debe contener el enlace de Login', () => {
    const wrapper = mount(HeaderPublic, mountOptions);
    expect(wrapper.text()).toContain('Login');
  });
});