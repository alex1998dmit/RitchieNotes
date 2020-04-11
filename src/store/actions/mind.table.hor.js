import { fromTreeToMatrix } from '../../services/mind.table.handles';
import tree from '../../services/variables/test.tree';

const fromTreeToTable = () => {
    console.log(tree);
    const table = fromTreeToMatrix(tree);
    return {
        type: 'SET_HOR_MIND_TABLE',
        table,
    };
};

const removeBlock = id => {
    return {
        type: 'REMOVE_HOR_MIND_TABLE_BLOCK',
        id,
    };
};

const updateBlock = (id, block) => {
    return {
        type: 'UPDATE_HOR_MIND_TABLE_BLOCK',
        id,
        block,
    };
};

const setUIStatusToBlock = (id, status) => {
    return {
        type: 'SET_STATUS_TO_HOR_MIND_TABLE_BLOCK',
        id,
        status,
    };
};

const setUISelectedBlock = block => {
    return {
        type: 'SET_SELECTED_HOR_MIND_TABLE_BLOCK',
        block,
    };
};

const resetUISelectedStatus = status => {
    return {
        type: 'RESET_UI_STATUS_AT_HOR_MIND_TABLE',
        status,
    };
};

const resetUIStatuses = () => {
    return {
        type: 'RESET_UI_STATUSES_AT_HOR_MIND_TABLE',
    };
};

export default {
    fromTreeToTable,
    removeBlock,
    updateBlock,
    setUIStatusToBlock,
    resetUISelectedStatus,
    resetUIStatuses,
    setUISelectedBlock,
};
