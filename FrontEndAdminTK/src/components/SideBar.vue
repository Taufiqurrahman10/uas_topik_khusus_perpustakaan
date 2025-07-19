<template>
  <aside class="sidebar">
    <div>
      <div class="sidebar-header">
        <div class="logo-container">
          <img src="/src/assets/logo.svg" alt="App Logo" class="logo">
          <span class="brand-name">PerpusKita</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <ul>
          <li class="nav-category">Menu Utama</li>
          <li>
            <router-link to="/dashboard" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.026.026.05.054.07.084v6.101a2.25 2.25 0 01-2.25 2.25H5.022a2.25 2.25 0 01-2.25-2.25v-6.101c.02-.03.044-.058.07-.084L12 5.432z" /></svg>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/users" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path d="M4.5 6.375a.75.75 0 01.75-.75h9a.75.75 0 01.75.75v.75h-10.5v-.75zm10.5 0v.75a.75.75 0 001.5 0v-.75a.75.75 0 00-1.5 0z" /><path fill-rule="evenodd" d="M20.25 10.5a.75.75 0 01-.75.75H2.25a.75.75 0 010-1.5H19.5a.75.75 0 01.75.75zM3 15.75a.75.75 0 00.75-.75h16.5a.75.75 0 000-1.5H3.75a.75.75 0 00-.75.75z" clip-rule="evenodd" /></svg>
              <span>Kelola User</span>
            </router-link>
          </li>
          <li>
            <router-link to="/books" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path d="M.75 3.75A.75.75 0 011.5 3h16.5a.75.75 0 01.75.75v16.5a.75.75 0 01-.75.75H1.5a.75.75 0 01-.75-.75V3.75zM9 6a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z" /></svg>
              <span>Kelola Buku</span>
            </router-link>
          </li>
          <li>
            <router-link to="/categories" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="nav-icon">
                <path fill-rule="evenodd" d="M5.25 2.25c-1.105 0-2 .895-2 2v13.5c0 1.105.895 2 2 2h13.5c1.105 0 2-.895 2-2V4.25c0-1.105-.895-2-2-2H5.25zm8.25 4.5a.75.75 0 00-1.5 0v.25H10.5a.75.75 0 000 1.5h1.5V9a.75.75 0 001.5 0V7.5a.75.75 0 00-.75-.75z" clip-rule="evenodd" />
                <path d="M8.25 8.25a.75.75 0 000 1.5h.75v.75a.75.75 0 001.5 0v-1.5a.75.75 0 00-.75-.75H8.25z" />
              </svg>
              <span>Kelola Kategori</span>
            </router-link>
          </li>
          <li class="nav-category">Transaksi</li>
          <li>
            <router-link to="/loans" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A9.735 9.735 0 006 21a9.707 9.707 0 005.25-1.533.75.75 0 000-1.327A8.235 8.235 0 016 18a8.235 8.235 0 01-4.25-.967V5.05A8.235 8.235 0 016 6a8.235 8.235 0 015.25.967.75.75 0 000-1.327z" /><path d="M12.75 3a.75.75 0 00-1.5 0v18a.75.75 0 001.5 0V3z" /></svg>
              <span>Peminjaman</span>
            </router-link>
          </li>
          <li>
            <router-link to="/returns" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="nav-icon"><path d="M12.75 15a.75.75 0 000-1.5H6.75a.75.75 0 000 1.5h6zm0-4.5a.75.75 0 000-1.5H6.75a.75.75 0 000 1.5h6zm-3-4.5a.75.75 0 000-1.5H6.75a.75.75 0 000 1.5h3z" /><path fill-rule="evenodd" d="M12.75 2.25a.75.75 0 01.75.75v18a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM2.25 3A.75.75 0 001.5 3.75v16.5a.75.75 0 00.75.75h18a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75H2.25z" clip-rule="evenodd" /></svg>
              <span>Pengembalian</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div class="sidebar-footer">
      <p>&copy; {{ new Date().getFullYear() }} PerpusKita</p>
    </div>
  </aside>
</template>