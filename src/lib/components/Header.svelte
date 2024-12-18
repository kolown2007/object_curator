<script lang="ts">
  import { page } from '$app/stores';
   import { signOut } from "@auth/sveltekit/client"
  import { 
    Navbar,
    NavBrand,
    Avatar,
    Dropdown,
    DropdownHeader,
    DropdownItem,
    DropdownDivider,
    DarkMode,
    Search,
    Button
  } from 'flowbite-svelte';



  

  export let user: {
    name: string;
    email: string;
    image: string;
  };

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/"
    });
  };

  $: currentPage = $page.url.pathname.split('/').filter(Boolean).pop() || 'Home';


  
</script>

<Navbar class ="fixed top-0 left-0 right-0 w-full z-50 bg-white dark:bg-gray-800 h-12 flex items-center shadow-sm dark:shadow-gray-900">
    <NavBrand href="/">
    <img src="/oc_vector.svg" alt="Logo" class="w-5 h-5" />
    </NavBrand>

    <div class="flex-grow text-center ">
      <span class=" font-semibold dark:text-white text-xs lg:text-xl">
        {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
      </span>
    </div>

    <div class="flex items-center gap-4">
      <!-- <Search 
        class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5 outline-none"
      /> -->
  
      <DarkMode 
        class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-2.5"
      />
  
      <Avatar 
        id="avatar-menu" 
        src={user?.image || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
        alt={user?.name || "User avatar"}
        class="w-4 h-4 lg:w-6 lg:h-6" 
      />
    </div>
  </Navbar>