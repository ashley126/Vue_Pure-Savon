<template>
  <div class="progressStep">
    <div class="row">
      <div class="col-4">
        <div class="step" :class="{ 'now':current===1 }">
          <p>{{ $t("Progress_step.step1") }}</p>
        </div>
      </div>
      <div class="col-4">
        <div class="step" :class="{ 'now':current===2 }">
          <p>{{ $t("Progress_step.step2") }}</p>
        </div>
      </div>
      <div class="col-4">
        <div class="step" :class="{ 'now':current===3 }">
          <p>{{ $t("Progress_step.step3") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressStep',
  props: ['current']
}
</script>
