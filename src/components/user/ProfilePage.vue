<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-lg-6 mx-auto">
                <div class="card">
                    <div class="card-body">
                        <h2 class="text-center">Edit Profile</h2>
                        <form @submit.prevent="updateProfile">
                            <div class="mb-3">
                                <label class="form-label">Username</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="profile.username"
                                />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="profile.name"
                                />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input
                                    type="email"
                                    disabled
                                    class="form-control"
                                    v-model="profile.email"
                                />
                            </div>
                            <hr />
                            <h5 class="text-centered">Roles</h5>
                            <div
                                class="form-check"
                                v-for="role in roles"
                                :key="role.id"
                            >
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    :value="role.id"
                                    v-model="selectedRoles"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    {{ role.name }}
                                </label>
                            </div>
                            <hr />
                            <div class="mt-3">
                                <button class="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const roles = ref([]);
        const store = useStore();
        const profile = store.getters["auth/getProfile"];
        const selectedRoles = ref([]);

        async function updateProfile() {
            let roles = [];
            selectedRoles.value.forEach((role) => {
                roles.push("roles/" + role);
            });
            profile.roles = roles;

            const userRef = doc(db, "users", 'wgMzs7UlruNtvlPs0acm');

            await updateDoc(userRef, profile);
        }

        onMounted(async () => {
            profile.roles?.forEach(el => {
                let roleId = el.split('/').pop();
                selectedRoles.value.push(roleId);
            });

            const querySnapshot = await getDocs(collection(db, "roles"));
            let fsRoles = [];
            querySnapshot.forEach((doc) => {
                const role = {
                    id: doc.id,
                    name: doc.data().name,
                };
                fsRoles.push(role);
            });

            roles.value = fsRoles;
        });

        return {
            roles,
            selectedRoles,
            profile,
            updateProfile,
        };
    },
};
</script>
