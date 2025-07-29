/*
import {useCallback, useEffect, useRef, useState} from 'react';
import useAuth from "./useAuth.tsx";


const useSectionPermissions = (section: string | null = null, prefetch: boolean = false) => {
    const storageKey = `permissions`;
    const {user, setUserPermissions} = useAuth();
    const loadFromUser = useRef(section === null);

    const [permissions, setPermissions] = useState<Record<string, unknown>>(() => {
        const stored = sessionStorage?.getItem(storageKey);
        return stored ? JSON.parse(stored) : null;
    });

    const updatePermissions = useCallback((section: string) => {
        console.log('updatePermissions', section);
        fetch(`/api/user/permissions/${section}`)
            .then(res => res.json())
            .then(data => {
                setPermissions((prev) => ({...prev, [section]: data}));
            })
            .catch(err => {
                console.error('Errore caricamento permessi:', err);
                setPermissions((prev) => ({...prev, [section]: []})); // fallback sicuro
            });
    }, []);

    useEffect(() => {
        console.log('useSectionPermissions', loadFromUser.current, permissions, user);
        if (loadFromUser.current && user) {
            loadFromUser.current = false;
            console.log('Caricamento permessi in corso...', user);
            const sections = user.permissions
                .filter((item: string) => item.startsWith('section-'))
                .map((item: string) => item.slice('section-'.length));

            console.log('Sezioni disponibili:', sections);
            sections.forEach((section: string) => {
                console.log("recursive", section);
                updatePermissions(section);
            });
        }
    }, [permissions, storageKey, updatePermissions, user]);

    useEffect(() => {
        if (permissions) {
            sessionStorage.setItem(storageKey, JSON.stringify(permissions));
            setUserPermissions(permissions);
        }
    }, [permissions, setUserPermissions, storageKey]);

    useEffect(() => {
        if (section !== null) {
            updatePermissions(section);
        }
    }, [section, updatePermissions]);

    return permissions;
}

export default useSectionPermissions;
*/
