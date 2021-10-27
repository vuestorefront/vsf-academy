<template>   
  <div class="sf-timer" :class="{'is-ready': timeUp}">
    <svg
      class="sf-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="sf-timer__circle">
        <circle
          class="sf-timer__path-elapsed"
          cx="50"
          cy="50"
          r="46.5"
        />
        <path
          :stroke-dasharray="circleDashArray"
          class="sf-timer__path-remaining"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <slot name="label">
      <div v-if="timeUp" class="sf-timer__label">
        I'm here!
      </div>    
      <div v-else class="sf-timer__label">
        {{ formattedTimeLeft }}
        <span class="sf-timer__label-min">
          min
        </span>
      </div>  
    </slot>
  </div>
</template>
<script>
import { computed, ref, watch, onMounted } from '@vue/composition-api'

export default {
  name: "SfTimer",  
  props: {
    timeLimit: {
      type: Number,
      default: "",
    }
  },
  setup(props, context) {
    const timePassed = ref(0);
    const timerInterval = ref(null);
    const timeUp = ref(false);

    const timeLeft = computed(() => {
      return props.timeLimit - timePassed.value;
    });
    const formattedTimeLeft = computed(() => {
      const minutes = Math.floor(timeLeft.value / 60)
      let seconds = timeLeft.value % 60
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      return `${minutes}:${seconds}`
    });
    const timeFraction = computed(() => {      
      const rawTimeFraction = timeLeft.value / props.timeLimit; 
      return rawTimeFraction - (1 / props.timeLimit) * (1 - rawTimeFraction);
    }); 
    const circleDashArray = computed(() => {
      return `${(timeFraction.value * 283).toFixed(0)} 283`;
    });         

    const startTimer = () => {      
      timerInterval.value = setInterval(() => (timePassed.value += 1), 1000);
    };
    const onTimesUp = () => {
      clearInterval(timerInterval.value);
      timeUp.value = true;
      context.emit('timeUp', timeUp.value)
    };
    
    watch(timeLeft, (newValue) => {
      if(newValue === 0) {
        onTimesUp()
      }
    });

    onMounted(startTimer);

    return {
      timeUp,
      circleDashArray,
      formattedTimeLeft,      
    }
  }
}
</script>
<style scoped lang="scss">  
  .sf-timer {
    --timer-size: 9.375rem;
    position: relative;
    width: var(--timer-size);
    height: var(--timer-size);
    &__circle {
      fill: var(--c-light);
      stroke: transparent;
    }
    &__path-elapsed {
      stroke-width: 4px;
      stroke: transparent;
    }
    &__label {
      position: absolute;
      width: var(--timer-size);
      height: var(--timer-size);   
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: var(--h1-font-size);
      font-weight: var(--font-weight--semibold);
      &-min {
        font-size: var(--h3-font-size);
        font-weight: var(--font-weight--bold);
      }
    }  
    &__path-remaining {
      stroke-width: var(--spacer-2xs);
      stroke-linecap: round;
      transform: rotate(90deg);
      transform-origin: center;
      transition: 1s linear all;
      stroke: var(--c-primary);
    }
    &__svg {
      transform: scaleX(-1);
    }
    &.is-ready {
      & .sf-timer__circle {
        fill: var(--c-primary);
      }
      & .sf-timer__label {
        color: var(--c-white)
      }
    }
    @include for-desktop {
      &__label {
        font-size: var(--h3-font-size);
        &-min {
          font-size: var(--h4-font-size);
        }
      }
    }
  }
</style>
