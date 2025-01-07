<script lang="ts">
import { Card } from 'flowbite-svelte';
import { curateStore } from '$lib/components/curateStore';
import { get } from 'svelte/store';


  
  interface Props {
    data: {
    data: Array<{
      Chapter: string;
      HiRes: string;
      Filename: string;
      Title: string;
      Medium: string;
      Size: string;
      Year: string;
      Provenance: string;
      Annotation: string;
    }>;
  };

  }


  // let { data, curate = $bindable(true) }: Props = $props();

  let { data}: Props = $props();

  let curate = $derived($curateStore);



  const objects = data.data;
  const properties = objects.length > 0 ? Object.keys(objects[0]) : [];


  let selectedProperty = $state("Filename");
  let filterValue = $state("");

  // Filter items based on selectedProperty and filterValue
  const filteredItems = $derived(objects.filter(item => {
        const value = item[selectedProperty as keyof typeof item];
       
        if (!value) return false;
        
        // Direct string comparison without case conversion
        return filterValue === "" || 
        value.toString().toLowerCase().includes(filterValue.toLowerCase());
    }));
 


</script>


<main class=" flex ">
  

    <div class="py-2 px-4 mb-16 sm:mb-0 sm:ml-16 lg:mr-1 mt-12 " id="content-to-export">

   {#if curate}
      <div class ="px-1 py-3 ">
        <select bind:value={selectedProperty} class="p-2 border rounded">
          {#each properties as property}
            <option value={property}>{property}</option>
          {/each}
        </select>
        <input type="text" bind:value={filterValue} placeholder=" value" class="p-2 border rounded" />
      </div>
    {/if}
     
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each filteredItems as { Filename, Title, Medium, Size, Year, Provenance, Annotation }}
                <Card class="max-w-sm">
                    <img class="mb-3" alt={Title} src={"https://streetkonect.com/object_curator/pepito/main/" + Filename + ".jpg"}>
                    <p>{Filename}</p>
                    <p class='font-bold'>{Title}</p>
                    <p>{Medium}</p>
                    <p>{Size}</p>
                    <p>{Year}</p>
                    <p>{Provenance}</p>
                    &nbsp;
                    <p class="italic">{Annotation}</p>           
                </Card>
            {/each}
        </div>
    </div>

</main>