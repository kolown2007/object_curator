<script lang="ts">
    import { Sidebar, SidebarGroup} from 'flowbite-svelte';
    import { exportPDF } from './functions';
import { curateStore } from '$lib/components/curateStore';
import { get } from 'svelte/store';

/** @type {{objectcount?: number, items:any, curate?:boolean }} */

   

    let {
        objectcount = 0, // data for object count
        items = [], //data for pdf export
       
    } = $props();

    const handleExport = () => {
        exportPDF(items);
    };

    const toggleCurate = () => {
        curateStore.update(value => !value);
     
    };


   
</script>


<Sidebar class="
  sm:mt-12 sm:w-14 
  dark:text-slate-200 
  fixed 
  sm:left-0 sm:top-0 
  inset-x-0 bottom-0 h-10 w-auto sm:h-auto
  bg-white dark:bg-gray-800 
  flex sm:flex-col items-center 
  shadow-sm dark:shadow-gray-900
">
   

            <SidebarGroup class="w-full flex justify-center py-2">
                <p class="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600" title="total objects">
                    <span class="text-sm font-medium">{objectcount}</span>
                </p>
            </SidebarGroup>
            <SidebarGroup class="w-full flex justify-center py-2" title="add object">
                <img 
                src="/add.svg" 
                alt="Add Object" 
                class="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transform hover:scale-110 transition-all duration-200 cursor-pointer" 
            />
            </SidebarGroup>
       
            <SidebarGroup class="w-full flex justify-center py-2" title="curate objects" >
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <!-- svelte-ignore event_directive_deprecated -->
                <img src="/curate.svg" 
                alt="curate" 
                on:click={toggleCurate}
               class="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transform hover:scale-110 transition-all duration-200 cursor-pointer">
       
            </SidebarGroup>

            <SidebarGroup class="w-full flex justify-center py-2" title="export" >
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <!-- svelte-ignore event_directive_deprecated -->
                <img src="/export.svg" 
                alt="Add Object" 
                on:click={handleExport}
                class="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transform hover:scale-110 transition-all duration-200 cursor-pointer">
            </SidebarGroup>
    
           
   
    </Sidebar>
