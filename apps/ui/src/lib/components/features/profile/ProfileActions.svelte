<script lang="ts">
  import { Icon, Button } from '../../common';
  import { PROFILE_STYLES } from '../../../constants/profile';

  export let onLogout: () => void;
  export let onSave: () => void;
  export let disabled: boolean = false;
  export let loading: boolean = false;
</script>

<!-- Action Buttons - Desktop only -->
<div class="hidden md:block py-8">
  <div class="flex justify-between items-center gap-4">
    <Button 
      on:click={onLogout}
    >
      <Icon name="logout" size="w-4 h-4" class_="mr-2" color="text-white" />
      Logout
    </Button>
    
    <Button 
      on:click={onSave}
      {disabled}
      {loading}
    >
      {#if loading}
        <Icon name="spinner" size="w-4 h-4" class_="mr-2 animate-spin" />
        Saving...
      {:else}
        <Icon name="check" size="w-4 h-4" class_="mr-2" color="text-white" />
        Save Changes
      {/if}
    </Button>
  </div>
</div>

<!-- Action Buttons - Mobile only -->
<div class="md:hidden {PROFILE_STYLES.actionBar}">
  <div class="max-w-4xl mx-auto px-6">
    <div class="flex justify-between items-center gap-4">
      <Button 
        on:click={onLogout}
      >
        <Icon name="logout" size="w-4 h-4" class_="mr-2" color="text-white" />
        Logout
      </Button>
      
      <Button 
        on:click={onSave}
        {disabled}
        {loading}
      >
        {#if loading}
          <Icon name="spinner" size="w-4 h-4" class_="mr-2 animate-spin" />
          Saving...
        {:else}
          <Icon name="check" size="w-4 h-4" class_="mr-2" color="text-white" />
          Save Changes
        {/if}
      </Button>
    </div>
  </div>
</div> 