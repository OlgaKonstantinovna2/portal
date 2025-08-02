<script lang="ts">
  export let countryCode: string;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let rounded: boolean = false;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const roundedClasses = rounded ? 'rounded-full' : 'rounded';
</script>

<span 
  class="fi fi-{countryCode} {sizeClasses[size]} {roundedClasses} inline-block"
  title={countryCode.toUpperCase()}
></span> 