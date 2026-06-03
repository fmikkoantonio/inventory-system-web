import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = signal(false);

  constructor() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      this.enableDark();
    } else {
      this.enableLight();
    }
  }

  toggle() {
    this.isDark() ? this.enableLight() : this.enableDark();
  }

  enableDark() {
    document.documentElement.classList.add('dark');

    document.documentElement.classList.add('p-dark');

    localStorage.setItem('theme', 'dark');

    this.isDark.set(true);
  }

  enableLight() {
    document.documentElement.classList.remove('dark');

    document.documentElement.classList.remove('p-dark');

    localStorage.setItem('theme', 'light');

    this.isDark.set(false);
  }
}
