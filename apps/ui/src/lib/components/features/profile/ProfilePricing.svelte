<script lang="ts">
  import { Icon, FormInput } from '../../common';
  import { PROFILE_STYLES } from '../../../constants/profile';

  export let pricePerHour: number;
</script>

<div class={PROFILE_STYLES.section}>
  <h2 class={PROFILE_STYLES.sectionTitle}>
    <Icon name="currency-dollar" size="w-5 h-5" class_="text-primary-500" />
    Pricing
  </h2>
  <FormInput
    id="price_per_hour"
    label="Price per Hour ($)"
    bind:value={pricePerHour}
    type="number"
    placeholder="50"
  />
</div> 