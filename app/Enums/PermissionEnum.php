<?php

namespace App\Enums;

enum PermissionEnum: string
{
    // SEZIONI PER MENU

    case SECTION_ADMIN = 'section-admin';
    case SECTION_FUMETTI = 'section-fumetti';

    // ADMIN

    case ADMIN_USERS = 'admin-users';
    case ADMIN_FUMETTI = 'admin-fumetti';

    // FUMETTI

    case FUMETTI_VIEW_ALL = 'fumetti-view-all';
    case FUMETTI_CREATE = 'fumetti-create';
    case FUMETTI_EDIT = 'fumetti-edit';
    case FUMETTI_DELETE = 'fumetti-delete';
}
