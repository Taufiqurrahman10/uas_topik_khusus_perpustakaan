<template>
  <section class="hero">
    <div class="decor decor-yellow"></div> <div class="decor decor-blue"></div>
    <div class="decor decor-right"></div>
    <div class="decor decor-ring"></div>
    <div class="decor decor-small-1"></div>
    <div class="decor decor-small-2"></div>
    
    <div class="decor decor-left-dot"></div>

    <div class="decor decor-plus decor-plus-1"></div>
    <div class="decor decor-plus decor-plus-2"></div>
    <div class="decor decor-triangle"></div>


    <div class="content">
      <h1 class="hero-title">Buka Jendela Dunia Lewat Buku</h1>
      <p class="hero-description">
        Eksplorasi, baca, dan kembangkan pengetahuanmu bersama kami di PerpusKita.
      </p>
    </div>
  </section>
</template>

<script setup></script>

<!-- <style scoped>
.hero {
  position: relative;
  background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
  padding: 10rem 2rem;
  text-align: center;
  color: #fff;
  overflow: hidden;
  border-radius: 0 0 18px 18px;
}

.content {
  position: relative;
  z-index: 2;
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  animation: slide-up-fade-in 0.8s ease-out 0.2s forwards;
  opacity: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.search-bar {
  display: flex;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
  animation: slide-up-fade-in 0.8s ease-out 0.4s forwards;
  opacity: 0;
}

.search-bar input {
  flex: 1;
  padding: 1rem 1.2rem;
  border: none;
  border-radius: 8px 0 0 8px;
  font-size: 1rem;
  transition: box-shadow 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.25);
}

.search-bar button {
  background: #FFC107;
  border: none;
  padding: 0 1.5rem;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.search-bar button:hover {
    transform: scale(1.05);
}

.search-bar button:active {
    transform: scale(0.98);
}


.decor {
  position: absolute;
  z-index: 1;
  animation: float-anim 6s ease-in-out infinite;
  border-radius: 50%; 
}


.decor-yellow {
  width: 80px; 
  height: 80px;
  background: #FFC107;
  top: 20%;
  left: 15%;
  
  animation: float-anim 7s ease-in-out infinite, morph-anim 8s ease-in-out infinite;
}

.decor-blue {
  width: 50px;
  height: 50px;
  background: #00BFFF;
  bottom: 15%;
  right: 20%;
  animation-duration: 8s;
  animation-delay: 1s;
}

.decor-right {
  width: 180px;
  height: 180px;
  background: #FFC107;
  top: -40px;
  right: -60px;
  animation-duration: 9s;
}

.decor-ring {
  width: 220px;
  height: 220px;
  background: transparent;
  border: 20px solid rgba(255, 193, 7, 0.5);
  top: -60px;
  right: -80px;
  animation-duration: 9s;
}

.decor-small-1 {
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
  bottom: 25%;
  left: 35%;
  animation-duration: 10s;
  animation-delay: 2s;
}

.decor-small-2 {
  width: 20px;
  height: 20px;
  background: rgba(0, 191, 255, 0.5);
  top: 30%;
  right: 10%;
  animation-duration: 12s;
}

.decor-left-dot {
  width: 15px;
  height: 15px;
  background: #FFC107;
  opacity: 0.8;
  bottom: 10%;
  left: 10%;
  animation-duration: 5s;
  animation-delay: 0.5s;
}

.decor-plus {
    width: 20px;
    height: 20px;
    background: transparent;
    border-radius: 0;
}
.decor-plus::before, .decor-plus::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.8);
}
.decor-plus::before {
    width: 100%;
    height: 4px;
}
.decor-plus::after {
    width: 4px;
    height: 100%;
}

.decor-plus-1 {
    top: 15%;
    right: 30%;
    transform: rotate(45deg);
    animation-duration: 10s;
}

.decor-plus-2 {
    bottom: 20%;
    left: 5%;
    transform: rotate(-30deg);
    animation-duration: 13s;
    animation-delay: 1.5s;
}

.decor-triangle {
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 50px solid rgba(0, 191, 255, 0.6);
    top: 60%;
    left: 10%;
    animation-duration: 11s;
    border-radius: 0;
}


.hero::before {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(255,255,255,0.1) 20%, transparent 60%);
}


@keyframes slide-up-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float-anim {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}


@keyframes morph-anim {
  0% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
  100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
}
</style> -->