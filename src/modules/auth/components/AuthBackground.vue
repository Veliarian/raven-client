<script setup>

</script>

<template>
    <div class="auth-background">
        <div class="gradient-bg"></div>
        <div class="animated-circles">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
        </div>
        <div class="light-particles"></div>
    </div>
</template>

<style scoped>
.auth-background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
}

.gradient-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, rgba(28, 138, 67, 0.3), rgba(244, 244, 246, 0.2));
}

.dark .gradient-bg {
    background: linear-gradient(to bottom right, rgba(48, 212, 100, 0.2), rgba(38, 38, 38, 0.2));
}

.animated-circles {
    position: absolute;
    inset: 0;
}

.circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(3rem);
    opacity: 0.5;
}

.circle-1 {
    width: 500px;
    height: 500px;
    background-color: rgba(28, 138, 67, 0.1);
    top: 10%;
    left: 5%;
    animation: float1 20s infinite ease-in-out;
}

.circle-2 {
    width: 400px;
    height: 400px;
    background-color: rgba(244, 244, 246, 0.1);
    bottom: 10%;
    right: 15%;
    animation: float2 25s infinite ease-in-out;
}

.circle-3 {
    width: 600px;
    height: 600px;
    background-color: rgba(33, 170, 73, 0.1);
    top: 30%;
    right: 5%;
    animation: float3 18s infinite ease-in-out;
}

.dark .circle-1 {
    background-color: rgba(48, 212, 100, 0.15);
}

.dark .circle-2 {
    background-color: rgba(51, 51, 51, 0.15);
}

.dark .circle-3 {
    background-color: rgba(48, 212, 100, 0.15);
}

@keyframes float1 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(100px, 50px); }
}

@keyframes float2 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-70px, 100px); }
}

@keyframes float3 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(120px, -50px); }
}
</style>