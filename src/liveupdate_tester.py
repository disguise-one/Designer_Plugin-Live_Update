from d3 import Expression
from rlcompleter import Completer
import subscription_manager

__all__ = ['autocomplete']

def autocomplete(objExpr, propPath):
    object = Expression.evaluateFromString(objExpr)

    if object is None:
        return None
    
    names = dict(subscription_manager.__dict__)
    names.update(object=object)
    
    completer = Completer(names)

    matches = []
    index = 0
    while len(matches) < 20: # Limit total results
        match = completer.complete(propPath, index)
        if match is None:
            break
        if '__' in match:
            index += 1
            continue
        matches.append(match)
        index += 1

    return matches
