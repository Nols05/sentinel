"""
Author(s): @JavierRibaldelRio & @MrPedroX
Date: 2025-01-15
Description: This script contains a function to alternate sort a list of dictionaries based on a given key.
"""


def alternate_sort(queries, key):
    """
    Alternates sorting of a list of dictionaries based on a specified key.

    The function sorts the input list of dictionaries in ascending order
    based on the value of the specified key, and then rearranges the sorted
    list such that elements are alternated from the smallest and largest ends
    toward the center.

    Parameters:
        queries (list of dict): A list of dictionaries, each containing the specified key.
        key (str, optional): The key in the dictionaries to sort and alternate by.
                             Defaults to "id".

    Returns:
        list of dict: A list of dictionaries rearranged in alternating order from
                      the smallest and largest values of the specified key.

    Example:
        >>> queries = [{"id": 3}, {"id": 1}, {"id": 2}, {"id": 5}, {"id": 4}]
        >>> alternate_sort(queries)
        [{'id': 1}, {'id': 5}, {'id': 2}, {'id': 4}, {'id': 3}]

        >>> queries = [{"name": "Alice"}, {"name": "Charlie"}, {"name": "Bob"}]
        >>> alternate_sort(queries, key="name")
        [{'name': 'Alice'}, {'name': 'Charlie'}, {'name': 'Bob'}]
    """

    num_of_queries = len(queries)

    queries.sort(key=lambda x: x[key])

    # Stores the output
    alternated_sorted_queries = [None] * num_of_queries

    # Positions of the array
    pos_left = 0
    pos_right = num_of_queries - 1

    i = 0

    while i < num_of_queries:

        # If i is even
        if i % 2 == 0:
            alternated_sorted_queries[i] = queries[pos_left]
            pos_left += 1
        else:
            alternated_sorted_queries[i] = queries[pos_right]
            pos_right -= 1

        i += 1

    return alternated_sorted_queries
